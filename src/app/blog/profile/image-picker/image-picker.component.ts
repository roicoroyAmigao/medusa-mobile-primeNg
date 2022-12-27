import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('formElementRef', { static: false }) formElementRef: ElementRef<HTMLFormElement>;
  @Output() imagePick = new EventEmitter<any>();
  @Input() userAvatar: any;
  selectedImage: any;

  constructor(
    private platform: Platform,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    if (this.userAvatar) {
      this.selectedImage = this.userAvatar;
    }
  }

  async onPickImage() {
    // console.log('this.selectedImage');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 50,
    });
    const savedPhoto = await this.savePicture(capturedPhoto);
    // console.log(savedPhoto);
    this.imagePick.emit(savedPhoto.webviewPath);
    // this.selectedImage = await onLoadImage(savedPhoto);
    this.selectedImage = savedPhoto.webviewPath;
    // console.log(savedPhoto);
  }
  private async savePicture(cameraPhoto: Photo) {
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  onFileChosen(event: any) {

    const pickedFile = (event.target as any).files[0];

    if (!pickedFile) {
      return;
    }

    const fr: any = new FileReader();

    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }

  private async readAsBase64(cameraPhoto: Photo | any) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });
      return file.data;
    } else {
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
}
export async function onLoadImage(savedPhoto: any) {
  const readFile = await Filesystem.readFile({
    path: savedPhoto.filepath,
    directory: Directory.Data,
  });
  return `data:image/jpeg;base64,${readFile.data}`;
}
