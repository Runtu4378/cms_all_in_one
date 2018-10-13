import { Tab } from 'components/layout'
import les from './pan.less'

const FormPan = (props) => {
  const {
    title,
    styles,
    children: DOM,
  } = props

  return (
    <Tab
      title={title}
      position="3"
      noMargin={true}
      styles={styles}
    >
      <div className={les.container}>
        {DOM
        ? <DOM {...props} />
        : null}
      </div>
    </Tab>
  )
}

export default FormPan
