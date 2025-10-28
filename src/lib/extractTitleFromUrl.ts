export const extractTitleFromUrl = (url: string) => {
  try {
    // Extraer la parte del título de la URL
    const parts = url.split('/');
    const titlePart = parts[parts.length - 2]; // Penúltima parte antes del ID
    
    // Eliminar el número al final (ej: -3042473)
    const titleWithoutNumber = titlePart.replace(/-\d+$/, '');
    
    // Reemplazar guiones con espacios
    let title = titleWithoutNumber.replace(/-/g, ' ');
    
    // Capitalizar la primera letra de cada palabra
    title = title.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return title;
  } catch (error) {
    return 'Error al procesar URL';
  }
}
