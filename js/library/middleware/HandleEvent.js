export default function HandleEvent(event, func, element) {
  element.addEventListener(event, func);
  console.group(event);
  console.log(element);
  console.log(element.value);
  console.groupEnd();
}
