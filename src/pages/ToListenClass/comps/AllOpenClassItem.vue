<template>
  <div class="OpenClassPassedItem">
    <div class="OpenClassPassedItem_detail">
      <div class="OpenClassPassedItem_name">
        <span class="o_tag">{{ data.subject[0] }}</span>
        <span class="o_user-name">{{ data.userName }}</span>
      </div>
      <div class="OpenClassPassedItem_course-name"> 《{{ data.courseName }}》 </div>
      <div class="OpenClassPassedItem_place"> 地点：{{ data.place }} </div>
      <div class="OpenClassPassedItem_date">
        <span class="date">{{ data.date }}</span>
        <span class="time">{{ data.time }}</span>
      </div>
    </div>
    <div class="OpenClassPassedItem_action-bar">
      <slot name="btns"></slot>
      <!-- <nut-button size="small" type="danger" plain>移出计划</nut-button>
      <nut-button size="small" type="primary" plain @click="onAddUserCourse"
        >添加到听课</nut-button
      > -->
      <div class="OpenClassPassedItem_grade">{{ data.gradClass }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    data: {
      subject: string
      userName: string
      courseName: string
      place: string
      date: string
      time: string
      gradClass: string
    }
  }>(),
  {
    data() {
      return {
        course_id: '',
        user_id: '',
        start_time: '',
        date_time: '',

        subject: '语文',
        userName: '姓名',
        courseName: '沁园春',
        place: '七年级7班',
        date: '2020-12-12',
        time: '21:00',
        gradClass: '七年级1班',
      }
    },
  },
)
</script>
<style lang="scss">
$primary-color: #70abff;
$gray-color: #888;

.OpenClassPassedItem {
  display: flex;
  // border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
  box-shadow: -1px 1px 13px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 10px;
}

.OpenClassPassedItem_detail {
  flex: 1;
}

.OpenClassPassedItem_name {
  font-size: 16px;
  // padding: 10px 0;

  .o_tag {
    color: $primary-color;
    border: 1px solid $primary-color;
    display: inline-block;
    padding: 1px 5px;
    border-radius: 4px;
    margin-right: 5px;
  }
}

.OpenClassPassedItem_course-name {
  color: #faad14;
  font-size: 16px;
  padding: 8px 0;
}

.OpenClassPassedItem_place {
  // padding: 10px 0;
  padding-bottom: 10px;
  color: $gray-color;
}

.OpenClassPassedItem_date {
  color: $gray-color;

  .date {
    margin-right: 6px;
  }
}

.OpenClassPassedItem_grade {
  color: $gray-color;
}

.OpenClassPassedItem_action-bar {
  width: 90px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  // .nut-button {
  //   // margin: 4px 0;
  // }
}
</style>
