import { Pipe, PipeTransform } from '@angular/core';
import Prism from 'prismjs';

@Pipe({
  name: 'highlight',
  standalone: false
})
export class HighlightPipe implements PipeTransform {

  transform(code: string, language: string = 'javascript'): string {
    if (!code) return code;

    // Verificar si el lenguaje está en Prism
    if (!Prism.languages[language]) {
      // Si no está disponible, usamos un valor predeterminado como 'plaintext' o 'javascript'
      language = 'javascript'; // Cambia esto a 'plaintext' si prefieres un resaltado genérico
    }

    // Resaltar el código
    const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
    return highlightedCode;
  }

}
