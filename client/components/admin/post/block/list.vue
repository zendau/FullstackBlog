<script setup lang="ts">
defineExpose({
  getData,
})

const content = ref()

function getData() {
  if (!content.value) return

  return {
    block: "list",
    content: content.value,
  }
}

function onKeyDown(event: any) {
  const target = event.target
  content.value = target.innerHTML
  if (event.code === "Enter") {
    const lastChild = target.lastChild
    const text = lastChild.textContent

    if (text.length !== 0) return

    const selectionText = window.getSelection()

    if (!selectionText) return

    selectionText.removeAllRanges()
    event.preventDefault()
  } else if (event.code === "Backspace") {
    const targetText = event.target.textContent.trim()
    if (targetText.length === 0) {
      event.preventDefault()
    }
  }
}

function onKeyUp(event: any) {
  const target = event.target
  content.value = target.innerHTML
}
</script>

<template>
  <ul
    contenteditable="true"
    class="test"
    :class="$style.test"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
  >
    <li></li>
  </ul>
</template>

<style lang="scss" module>
.test {
  outline: none;
  list-style-type: disc; /* Убираем стандартные маркеры списка */
  padding: 25px; /* Убираем внутренние отступы */
  margin: 0; /* Убираем внешние отступы */
}

.test li {
  padding: 8px 0; /* Задаем отступы сверху и снизу для каждого элемента списка */
  border-bottom: 1px solid #ccc; /* Добавляем разделительные линии между элементами списка */
  position: relative; /* Для позиционирования маркера */
}

.test li:last-child {
  border-bottom: none; /* Убираем разделительную линию у последнего элемента списка */
}

.test li::before {
  content: ""; /* Создаем псевдоэлемент */
  width: 10px; /* Задаем ширину круглого маркера */
  height: 10px; /* Задаем высоту круглого маркера */
  background-color: #333; /* Задаем цвет круглого маркера */
  border-radius: 50%; /* Делаем круглый маркер */
  display: block; /* Делаем псевдоэлемент блочным */
  position: absolute; /* Абсолютное позиционирование относительно родительского элемента li */
  top: 50%; /* Позиционируем маркер по вертикали по центру элемента li */
  left: -20px; /* Позиционируем маркер слева от текста */
  transform: translateY(
    -50%
  ); /* Корректируем позиционирование маркера по вертикали */
}

.test li:hover {
  background-color: #f0f0f0; /* Изменяем цвет фона при наведении курсора */
}

.test li a {
  text-decoration: none; /* Убираем подчеркивание у ссылок */
  color: #333; /* Задаем цвет текста для ссылок */
}

.test li a:hover {
  color: #007bff; /* Изменяем цвет текста при наведении курсора на ссылку */
}
</style>
