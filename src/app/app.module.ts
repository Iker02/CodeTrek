import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { firebaseApp } from './firebase.config';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
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

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { DesafioComponent } from './components/desafio/desafio.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VbLevel1Component } from './components/vb-level-1/vb-level-1.component';
import { VbLevel2Component } from './components/vb-level-2/vb-level-2.component';
import { VbLevel3Component } from './components/vb-level-3/vb-level-3.component';
import { VbLevel4Component } from './components/vb-level-4/vb-level-4.component';
import { VbLevel5Component } from './components/vb-level-5/vb-level-5.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { DifficultyFilterPipe } from './pipes/difficulty-filter.pipe';
import { ErrorComponent } from './error/error.component';
import { SqlLevel1Component } from './components/sql-level-1/sql-level-1.component';
import { SqlLevel2Component } from './components/sql-level-2/sql-level-2.component';
import { SqlLevel3Component } from './components/sql-level-3/sql-level-3.component';
import { SqlLevel4Component } from './components/sql-level-4/sql-level-4.component';
import { SqlLevel5Component } from './components/sql-level-5/sql-level-5.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CatalogoComponent,
    CourseDetailComponent,
    LevelComponent,
    PythonLevel1Component,
    PythonLevel2Component,
    PythonLevel3Component,
    PythonLevel4Component,
    PythonLevel5Component,
    CSharpLevel1Component,
    CSharpLevel2Component,
    CSharpLevel3Component,
    CSharpLevel4Component,
    CSharpLevel5Component,
    ProgrammingTutorialComponent,
    ChallengesComponent,
    DesafioComponent,
    SettingsComponent,
    VbLevel1Component,
    VbLevel2Component,
    VbLevel3Component,
    VbLevel4Component,
    VbLevel5Component,
    HighlightPipe,
    DifficultyFilterPipe,
    ErrorComponent,
    SqlLevel1Component,
    SqlLevel2Component,
    SqlLevel3Component,
    SqlLevel4Component,
    SqlLevel5Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    { provide: 'FirebaseApp', useValue: firebaseApp },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'codetrek-f4fe6',
        appId: '1:810373237387:web:e00266c09cb0b40375e28e',
        storageBucket: 'codetrek-f4fe6.firebasestorage.app',
        apiKey: 'AIzaSyCsoICy4ccu-xV0ZQDU7PWiiTxgI0j8oug',
        authDomain: 'codetrek-f4fe6.firebaseapp.com',
        messagingSenderId: '810373237387',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
