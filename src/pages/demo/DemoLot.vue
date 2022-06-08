<script lang="ts" setup>
import ButtonSelect from '@/components/Button/ButtonSelect.vue'
import BoxView from './comp/BoxView.vue'
import TabBar from '@/components/TabBar/TabBar.vue'
import MoreList from '@/components/TabBar/MoreList.vue'
import TabsDemo from './comp/TabsDemo.vue'
import TabsDemo2 from './comp/TabsDemo2.vue'
import InfoBox from '@/components/InfoBox.vue'
import CardPlus from '@/components/CardPlus.vue'
import ChartBarCustom from '@/components/ChartBarCustom.vue'
import MenuAndSearch from './comp/MenuAndSearch.vue'
import CardCourseFirst from './comp/CardCourseFirst.vue'
import CardCourseSecond from './comp/CardCourseSecond.vue'
import CardCourseThird from './comp/CardCourseThird.vue'
import TabButtonsDemo from '@/components/TabButtons/TabButtonsDemo.vue'

import Calendar from '@/components/Calendar/Calendar.vue'
import ButtonBlock from '@/components/Button/ButtonBlock.vue'
import TagView from '@/components/Tag/TagView.vue'
import TagFlag from '@/components/Tag/TagFlag.vue'
import ImgList from '@/components/ImgView/ImgList.vue'
import VideoList from '@/components/VideoView/VideoList.vue'
import IconLink from '@/components/IconLink.vue'
import SearchBarSelect from '@/components/SearchBarSelect.vue'
import SearchBarSelect2 from '@/components/SearchBarSelect2.vue'
import BottomOkButtons from '@/components/Button/BottomOkButtons.vue'
import SelectCheck from '@/components/SelectCheck/SelectCheck.vue'
</script>
<template>
  <div style="margin: 10px">
    <BoxView title="Calendar">
      <Calendar></Calendar>
    </BoxView>
    <BoxView title="SelectCheck">
      <SelectCheck></SelectCheck>
    </BoxView>
    <BoxView title="CardPlus">
      <div style="background: #f6f6f6">
        <CardPlus title2="查看详情">
          <template #title>
            <div> 听评课人数： <em>16</em> 人 </div>
          </template>
          内容
        </CardPlus>
      </div>
    </BoxView>
    <BoxView title=".nut-tabs3.blue">
      <nut-tabs class="nut-tabs3 blue" modelValue="0">
        <nut-tabpane title="Tab 1"> Tab 1 </nut-tabpane>
        <nut-tabpane title="Tab 2"> Tab 2 </nut-tabpane>
        <nut-tabpane title="Tab 3"> Tab 3 </nut-tabpane>
      </nut-tabs>
    </BoxView>
    <BoxView title="TabsText">
      <TabsDemo></TabsDemo>
    </BoxView>
    <BoxView title="BottomOkButtons">
      <BottomOkButtons></BottomOkButtons>
    </BoxView>
    <BoxView title="SearchBarSelect2">
      <SearchBarSelect2 selected-name="一般" model-value="1" :isExpanded="false"></SearchBarSelect2>
    </BoxView>
    <BoxView title="SearchBarSelect">
      <SearchBarSelect searchValue="1" selectedValue="1" :isExpanded="false"></SearchBarSelect>
    </BoxView>
    <BoxView title="IconLink">
      <IconLink icon="pdf" type="custom" style="margin-right: 5px">xxx.pdf</IconLink>
      <IconLink icon="shop3" style="margin-right: 5px">xxx</IconLink>
      <IconLink icon="pdf" type="custom" style="color: red">xxx.pdf</IconLink>
    </BoxView>
    <BoxView title="VideoList">
      <VideoList
        :list="[
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
        ]"
      ></VideoList>
    </BoxView>
    <BoxView title="VideoList">
      <VideoList
        :deletable="false"
        :list="[
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
          {
            url: 'https://jvod.300hu.com/vod/product/a816a6e2-8bda-4ae9-8cff-ca1bc3b8db18/f57d6383884d4cbf9cb593b74d166474.mp4?source=2&h265=h265/18799/bcc33f15e7014f609d8c162f0cb9f782.mp4',
          },
        ]"
      ></VideoList>
    </BoxView>
    <BoxView title="ImgList">
      <ImgList
        :list="[
          {
            url: 'https://img14.360buyimg.com/babel/s590x470_jfs/t1/107259/32/26064/117235/6247ff98E47d882e1/32f7ad510bcdc88d.jpg.webp',
          },
          {
            url: 'https://img14.360buyimg.com/da/s590x470_jfs/t1/89877/35/8107/68939/5e01c031E62386e6b/aed10675ed2ce803.jpg.webp',
          },
          {
            url: 'https://img14.360buyimg.com/da/s590x470_jfs/t1/89877/35/8107/68939/5e01c031E62386e6b/aed10675ed2ce803.jpg.webp',
          },
          {
            url: 'https://img14.360buyimg.com/da/s590x470_jfs/t1/89877/35/8107/68939/5e01c031E62386e6b/aed10675ed2ce803.jpg.webp',
          },
          {
            url: 'https://img14.360buyimg.com/da/s590x470_jfs/t1/89877/35/8107/68939/5e01c031E62386e6b/aed10675ed2ce803.jpg.webp',
          },
          {
            url: 'https://img14.360buyimg.com/da/s590x470_jfs/t1/89877/35/8107/68939/5e01c031E62386e6b/aed10675ed2ce803.jpg.webp',
          },
        ]"
      ></ImgList>
    </BoxView>

    <BoxView title="ImgList">
      <ImgList
        :deletable="false"
        :list="[
          {
            url: 'https://img14.360buyimg.com/babel/s590x470_jfs/t1/107259/32/26064/117235/6247ff98E47d882e1/32f7ad510bcdc88d.jpg.webp',
          },
          {
            url: 'https://img14.360buyimg.com/da/s590x470_jfs/t1/89877/35/8107/68939/5e01c031E62386e6b/aed10675ed2ce803.jpg.webp',
          },
        ]"
      ></ImgList>
    </BoxView>

    <BoxView title="TagView">
      <TagView>标签</TagView>
      <TagView class="warning">标签</TagView>
      <TagView class="cyan">标签</TagView>
      <TagView class="purple">标签</TagView>
    </BoxView>
    <BoxView title="TagFlag">
      <TagFlag class="">标签</TagFlag>
      <TagFlag class="success">标签</TagFlag>
      <TagFlag class="info">标签</TagFlag>
    </BoxView>

    <BoxView title="InfoBox">
      <div style="background: #f6f6f6">
        <InfoBox :data="[{ value: '1', label: '标签' }]" title="infoBox"></InfoBox>
      </div>
    </BoxView>
    <BoxView title="ButtonBlock">
      <ButtonBlock linear-gradient>保存</ButtonBlock> <ButtonBlock>提交</ButtonBlock>
    </BoxView>

    <BoxView title="TabButtons">
      <TabButtonsDemo></TabButtonsDemo>
    </BoxView>

    <BoxView>
      <CardCourseThird></CardCourseThird>
    </BoxView>
    <BoxView>
      <CardCourseSecond></CardCourseSecond>
    </BoxView>
    <BoxView>
      <CardCourseFirst></CardCourseFirst>
    </BoxView>
    <BoxView title="ECharts">
      <navigator url="/packageECharts/pages/ECharts/ECharts">去图表页面 ECharts demo</navigator>
    </BoxView>
    <BoxView>
      <MenuAndSearch></MenuAndSearch>
    </BoxView>
    <BoxView title="ChartBarCustom">
      <ChartBarCustom :data="[]"></ChartBarCustom>
    </BoxView>

    <BoxView>
      <div style="position: relative; height: 150px">
        <v-empty></v-empty>
      </div>
    </BoxView>
    <BoxView>
      <ButtonSelect>箭头按钮</ButtonSelect>
    </BoxView>

    <BoxView>
      <TabBar></TabBar>
    </BoxView>
    <BoxView>
      <MoreList></MoreList>
    </BoxView>

    <BoxView title="TabsDemo2">
      <TabsDemo2></TabsDemo2>
    </BoxView>
  </div>
</template>
