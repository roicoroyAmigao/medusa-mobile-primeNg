import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { ThemeService } from 'src/app/shared/services/theme-settings.service';
import { ThemeActions } from './theme.actions';

export class ThemeStateModel {
    style: any;
}
@State<ThemeStateModel>({
    name: 'theme',
    defaults: {
        style: null,
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
        return state.style;
    }

    @Action(ThemeActions.GetTheme)
    getTheme(ctx: StateContext<ThemeStateModel>) {
        const state = ctx.getState();
        // console.log("payload", payload);
        this.strapi.getAppTheme()
            .pipe(tap((theme: any) => {
                // console.log("result", theme);
                ctx.patchState({
                    ...state,
                    style: theme,
                });
            }
            ));
    }

    @Action(ThemeActions.SetTheme)
    setTheme(ctx: StateContext<ThemeStateModel>, { theme }: ThemeActions.SetTheme) {
        const state = ctx.getState();

        // console.log(theme);

        ctx.patchState({
            ...state,
            style: theme,
        });
    }

}
