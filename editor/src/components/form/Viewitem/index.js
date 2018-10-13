import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Tooltip, message } from 'antd'
import CopyToClipboard from 'react-copy-to-clipboard'
import styles from './index.less'
import { defaultP, basePT } from '../basePT'

const FormItem = Form.Item

class ViewItem extends React.Component {
  render () {
    const {
      label,
      value,
      settingOfInput,
      layout,
    } = this.props
    const {
      copy,
    } = settingOfInput

    const copyDom = (value) => {
      return (
        <span className={styles.copyCon}>
          <CopyToClipboard
            text={value}
            onCopy={() => message.success('复制成功')}
          >
            <Tooltip placement="top" title="复制内容">
              <Icon type="copy" className={styles.copy} />
            </Tooltip>
          </CopyToClipboard>
        </span>
      )
    }

    const noCotent = () => {
      return <span title={'无内容'} className={styles.noContent}>无</span>
    }
    const content = (value) => {
      return <span title={value} className={styles.hadContent}>{value}</span>
    }

    return (
      <FormItem
        label={label}
        className={styles.outer}
        {...layout}
      >
        <div className={styles.content}>
          { value ? content(value) : noCotent() }
          { (copy && value) ? copyDom(value) : null }
        </div>
      </FormItem>
    )
  }
}

ViewItem.defaultProps = {
  ...defaultP,
  settingOfInput: {
    copy: false,
  },
}

ViewItem.propTypes = {
  ...basePT,
  settingOfInput: PropTypes.shape({
    copy: PropTypes.bool, // 是否能直接复制
  }),
}

export default ViewItem
