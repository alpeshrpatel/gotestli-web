export function renderTemplate(templateString, data) {
    return templateString.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
  }