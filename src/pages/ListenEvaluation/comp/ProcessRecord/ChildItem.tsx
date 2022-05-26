import RowThink from '../RowThink/RowThink.vue'
import RowPicture from '../RowPicture/RowPicture.vue'
import RowWrote from '../RowWrote/RowWrote.vue'
import RowVideo from '../RowVideo/RowVideo.vue'

interface PropsType {
  type: string
  recordIndex: number
  index: number
}

export default function (props: PropsType) {
  const { type, recordIndex, index } = props

  switch (type) {
    case 'think':
      return <RowThink recordIndex={recordIndex} index={index}></RowThink>
    case 'picture':
      return <RowPicture recordIndex={recordIndex} index={index}></RowPicture>
    case 'video':
      return <RowVideo recordIndex={recordIndex} index={index}></RowVideo>
    case 'drawing':
      return <RowWrote recordIndex={recordIndex} index={index}></RowWrote>
  }
}
