这部分代码应该集成到 CalendarView 中

```
selectedDate.value = dateItem.date
  if (dateItem.notCurrentMonth) {
    displayedDate.value = dayjs(dateItem.date)
  }
```

这里还要增加 change 事件

```
function onSelect(dateItem: DateItem) {
  emits('select', dateItem)
}
```
