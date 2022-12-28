import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { StrapiService } from 'projects/services/src/lib/services/strapi.service';
import { ThemeService } from 'projects/services/src/lib/services/theme-settings.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogErrorEntry } from '../errors-logging/errors-logging.actions';
import { ThemeActions } from './theme.actions';

export class ThemeStateModel {
    styles: any;
}
@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        styles: null,
    }
})
@Injectable()
export class ThemeState {

    constructor(
        private themeService: ThemeService,
        private store: Store,
        private strapi: StrapiService,
    ) { }

    @Selector()
    static getTheme(state: ThemeStateModel) {
        return state.styles;
    }

    @Action(ThemeActions.GetTheme)
    getTheme(ctx: StateContext<ThemeStateModel>) {
        const state = ctx.getState();
        // console.log("payload", payload);
        this.strapi.getAppTheme()
            .pipe(
                catchError((err: HttpErrorResponse) => throwError(() => {
                    this.store.dispatch(new LogErrorEntry(err));
                    return new Error(err.message)
                })),
            )
            .subscribe({
                next: (v: any) => {
                    return ctx.patchState({
                        ...state,
                        styles: v.data?.attributes,
                    });
                },
                error: (e: any) => {
                    console.error(e);
                },
                // complete: () => console.info('complete')
            });
    }

    @Action(ThemeActions.SetTheme)
    setTheme(ctx: StateContext<ThemeStateModel>, { theme }: ThemeActions.SetTheme) {
        const state = ctx.getState();
        ctx.patchState({
            ...state,
            styles: theme,
        });
    }

}
