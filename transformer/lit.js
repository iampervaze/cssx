function transform(content) {
  return `
import {css} from 'lit';
export default css\`
${content}
\`;
    `;
}

module.exports = {
  transform,
  extension: "js",
};
