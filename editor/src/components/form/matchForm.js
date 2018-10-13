import React from 'react'
import {
  Input,
  Checkbox,
  Radio,
  Viewitem,
  Select,
  Textarea,
  Custom,
  Editor,
} from '../form'

const matchFuc = (data) => {
  const { inputType } = data
  if (inputType === 'Input') {
    return <Input {...data} />
  } else if (inputType === 'Checkbox') {
    return <Checkbox {...data} />
  } else if (inputType === 'Radio') {
    return <Radio {...data} />
  } else if (inputType === 'Viewitem') {
    return <Viewitem {...data} />
  } else if (inputType === 'Select') {
    return <Select {...data} />
  } else if (inputType === 'Textarea') {
    return <Textarea {...data} />
  } else if (inputType === 'Custom') {
    return <Custom {...data} />
  } else if (inputType === 'Editor') {
    return <Editor {...data} />
  } else {
    throw new Error('fieldType error!')
  }
}

export default matchFuc