import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikesComponent } from './components/likes/likes.component';
import { DislikesComponent } from './components/dislikes/dislikes.component';

const routes: Routes = [
    {
        path: 'likes',
        component: LikesComponent
    },
    {
        path: 'dislikes',
        component: DislikesComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LazyLoadingRoutingModule { }