export function getGender(): string {
  const radios = document.getElementsByName(
    "gender"
  ) as NodeListOf<HTMLInputElement>;

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }

  return "";
}