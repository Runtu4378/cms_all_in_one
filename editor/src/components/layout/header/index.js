import { Menu, Icon } from 'antd'
import router from 'umi/router'
import les from './index.less'

const routes = [
  { label: '', link: '/', icon: 'home' },
  { label: '站点管理', link: '/site' },
  { label: '组件模板', link: '/component' },
  { label: '组合模板', link: '/template' },
]

const mapRoutes = (rou) => {
  return rou.map((d) => {
    return (
      <Menu.Item
        key={d.link}
        className={`${d.label ? '' : les.noLabel}`}
      >
        {d.icon ? <Icon type={d.icon} /> : ''}
        {d.label}
      </Menu.Item>
    )
  })
}

const Header = ({
  pathname,
}) => {
  const handleClick = (e) => {
    router.push(e.key)
  }
  return (
    <div className={les.header}>
      <Menu
        className={les.nav}
        onClick={handleClick}
        selectedKeys={[pathname]}
        mode='horizontal'
      >{mapRoutes(routes)}</Menu>
    </div>
  )
}

export default Header
