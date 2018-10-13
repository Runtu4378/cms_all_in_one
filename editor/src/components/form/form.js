import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import matchForm from './matchForm'
// import styles from './index.less'

// 垂直布局表单元素
const MyForm = ({
  fields,
  layout,
}) => {
  // 生成行
  const getFields = (dataNode) => {
    const children = dataNode.map((da, idx) => {
      const { inputType } = da
      let { cols } = da

      cols = (cols && JSON.stringify(cols) !== '{}') ? cols : layout
      cols = inputType === 'Hidden' ? { span: 0 } : cols

      return (
        <Col key={idx} {...cols}>
          {matchForm(da)}
        </Col>
      )
    })
    return children
  }

  return (
    <Row gutter={24}>
      {
        getFields(fields)
      }
    </Row>
  )
}

MyForm.defaultProps = {
  fields: [],
  layout: { span: 24 },
}

MyForm.propTypes = {
  fields: PropTypes.array.isRequired,
  layout: PropTypes.object,
}

export default MyForm
