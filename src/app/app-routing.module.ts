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
import { SqlLevel1Component } from './components/sql-level-1/sql-level-1.component';
import { SqlLevel2Component } from './components/sql-level-2/sql-level-2.component';
import { SqlLevel3Component } from './components/sql-level-3/sql-level-3.component';
import { SqlLevel4Component } from './components/sql-level-4/sql-level-4.component';
import { SqlLevel5Component } from './components/sql-level-5/sql-level-5.component';
import { KotlinLevel1Component } from './components/kotlin-level-1/kotlin-level-1.component';
import { KotlinLevel2Component } from './components/kotlin-level-2/kotlin-level-2.component';
import { KotlinLevel3Component } from './components/kotlin-level-3/kotlin-level-3.component';
import { KotlinLevel4Component } from './components/kotlin-level-4/kotlin-level-4.component';
import { KotlinLevel5Component } from './components/kotlin-level-5/kotlin-level-5.component';
import { JavascriptLevel1Component } from './components/javascript-level-1/javascript-level-1.component';
import { JavascriptLevel2Component } from './components/javascript-level-2/javascript-level-2.component';
import { JavascriptLevel3Component } from './components/javascript-level-3/javascript-level-3.component';
import { JavascriptLevel4Component } from './components/javascript-level-4/javascript-level-4.component';
import { JavascriptLevel5Component } from './components/javascript-level-5/javascript-level-5.component';
import { HtmlLevel1Component } from './components/html-level-1/html-level-1.component';
import { HtmlLevel2Component } from './components/html-level-2/html-level-2.component';
import { HtmlLevel3Component } from './components/html-level-3/html-level-3.component';
import { HtmlLevel4Component } from './components/html-level-4/html-level-4.component';
import { HtmlLevel5Component } from './components/html-level-5/html-level-5.component';
import { JavaLevel1Component } from './components/java-level-1/java-level-1.component';
import { JavaLevel2Component } from './components/java-level-2/java-level-2.component';
import { JavaLevel3Component } from './components/java-level-3/java-level-3.component';
import { JavaLevel4Component } from './components/java-level-4/java-level-4.component';
import { JavaLevel5Component } from './components/java-level-5/java-level-5.component';

// Configuración de rutas
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'challenges', component: ChallengesComponent },
  {
    path: 'catalogo/programming-tutorial/:title',
    component: ProgrammingTutorialComponent,
  },
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
  { path: 'course/sql/level/1', component: SqlLevel1Component },
  { path: 'course/sql/level/2', component: SqlLevel2Component },
  { path: 'course/sql/level/3', component: SqlLevel3Component },
  { path: 'course/sql/level/4', component: SqlLevel4Component },
  { path: 'course/sql/level/5', component: SqlLevel5Component },
  { path: 'course/kotlin/level/1', component: KotlinLevel1Component },
  { path: 'course/kotlin/level/2', component: KotlinLevel2Component },
  { path: 'course/kotlin/level/3', component: KotlinLevel3Component },
  { path: 'course/kotlin/level/4', component: KotlinLevel4Component },
  { path: 'course/kotlin/level/5', component: KotlinLevel5Component },
  { path: 'course/javascript/level/1', component: JavascriptLevel1Component },
  { path: 'course/javascript/level/2', component: JavascriptLevel2Component },
  { path: 'course/javascript/level/3', component: JavascriptLevel3Component },
  { path: 'course/javascript/level/4', component: JavascriptLevel4Component },
  { path: 'course/javascript/level/5', component: JavascriptLevel5Component },
  { path: 'course/html/level/1', component: HtmlLevel1Component },
  { path: 'course/html/level/2', component: HtmlLevel2Component },
  { path: 'course/html/level/3', component: HtmlLevel3Component },
  { path: 'course/html/level/4', component: HtmlLevel4Component },
  { path: 'course/html/level/5', component: HtmlLevel5Component },
  { path: 'course/java/level/1', component: JavaLevel1Component },
  { path: 'course/java/level/2', component: JavaLevel2Component },
  { path: 'course/java/level/3', component: JavaLevel3Component },
  { path: 'course/java/level/4', component: JavaLevel4Component },
  { path: 'course/java/level/5', component: JavaLevel5Component },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
