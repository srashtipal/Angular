import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StartQuizComponent } from './pages/start-quiz/start-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
      ,
      {
        path: 'categories',
        component: ViewCategoryComponent,
      }
      ,
      {
        path: 'addCategory',
        component: AddCategoryComponent,
      }
      ,
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      }
      ,
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      }
       ,
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuestionsComponent,
      }
      ,
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      }
      ,
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    children:[
      {
        path: ':catId',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qid',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start/:qid',
    component: StartQuizComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
