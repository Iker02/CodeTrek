import { Pipe, PipeTransform } from '@angular/core';
import Prism from 'prismjs';

@Pipe({
  name: 'highlight',
  standalone: false,
})
export class HighlightPipe implements PipeTransform {
  transform(code: string, language: string = 'javascript'): string {
    if (!code) return code;

    // Verificar si el lenguaje está en Prism
    if (!Prism.languages[language]) {
      // Si no está disponible, usamos javascript
      language = 'javascript';
    }

    // Resaltar el código
    const highlightedCode = Prism.highlight(
      code,
      Prism.languages[language],
      language
    );
    return highlightedCode;
  }
}
