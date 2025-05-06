import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { LevelComponent } from './components/level/level.component';
import { PythonLevel1Component } from './components/python-level-1/python-level-1.component';
import { PythonLevel2Component } from './components/python-level-2/python-level-2.component';
import { PythonLevel3Component } from './components/python-level-3/python-level-3.component';
import { PythonLevel4Component } from './components/python-level-4/python-level-4.component';
import { PythonLevel5Component } from './components/python-level-5/python-level-5.component';
import { CSharpLevel1Component } from './components/csharp-level-1/csharp-level-1.component';
import { CSharpLevel2Component } from './components/csharp-level-2/csharp-level-2.component';
import { CSharpLevel3Component } from './components/csharp-level-3/csharp-level-3.component';
import { CSharpLevel4Component } from './components/csharp-level-4/csharp-level-4.component';
import { CSharpLevel5Component } from './components/csharp-level-5/csharp-level-5.component';
import { ProgrammingTutorialComponent } from './components/programming-tutorial/programming-tutorial.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VbLevel1Component } from './components/vb-level-1/vb-level-1.component';
import { VbLevel2Component } from './components/vb-level-2/vb-level-2.component';
import { VbLevel3Component } from './components/vb-level-3/vb-level-3.component';
import { VbLevel4Component } from './components/vb-level-4/vb-level-4.component';
import { VbLevel5Component } from './components/vb-level-5/vb-level-5.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'challenges', component: ChallengesComponent },
  { path: 'catalogo/programming-tutorial/:title', component: ProgrammingTutorialComponent },
  { path: 'course/:title', component: CourseDetailComponent },
  { path: 'course/python/level/1', component: PythonLevel1Component },
  { path: 'course/python/level/2', component: PythonLevel2Component },
  { path: 'course/python/level/3', component: PythonLevel3Component },
  { path: 'course/python/level/4', component: PythonLevel4Component },
  { path: 'course/python/level/5', component: PythonLevel5Component },
  { path: 'course/csharp/level/1', component: CSharpLevel1Component },
  { path: 'course/csharp/level/2', component: CSharpLevel2Component },
  { path: 'course/csharp/level/3', component: CSharpLevel3Component },
  { path: 'course/csharp/level/4', component: CSharpLevel4Component },
  { path: 'course/csharp/level/5', component: CSharpLevel5Component },
  { path: 'course/visualbasic/level/1', component: VbLevel1Component },
  { path: 'course/visualbasic/level/2', component: VbLevel2Component },
  { path: 'course/visualbasic/level/3', component: VbLevel3Component },
  { path: 'course/visualbasic/level/4', component: VbLevel4Component },
  { path: 'course/visualbasic/level/5', component: VbLevel5Component },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
