import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ThemeActions } from './theme.actions';

export class ThemeStateModel {
    theme: any;
}
@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        theme: null,
    }
})
@Injectable()
export class ThemeState {

    constructor(
        // private themeService: ThemeService,
        private store: Store,
    ) { }

    @Selector()
    static getTheme(state: ThemeStateModel) {
        return state.theme;
    }

    @Action(ThemeActions.GetTheme)
    getTheme({ patchState, getState, setState }: StateContext<ThemeStateModel>) {
        const state = getState();
        // console.log("payload", payload);
        // this.strapi.getAppTheme()
        //     .pipe(tap((theme: any) => {
        //         console.log("result", theme);
        //         patchState({
        //             ...state,
        //             theme: theme,
        //         });
        //     }
        //     ));
    }

    @Action(ThemeActions.SetTheme)
    setTheme({ patchState, getState, setState }: StateContext<ThemeStateModel>, { payload }: ThemeActions.SetTheme) {
        const state = getState();
        if (payload?.user) {
            patchState({
                ...state,
                theme: payload,
            });
        };
    }

}
