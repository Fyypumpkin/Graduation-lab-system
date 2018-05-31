/**
 * @author fyypumpkin on 2018/5/1.
 */

const MenuList = [{
  id: '02',
  title: '人员管理',
  icon: 'team',
  items: [
    {id: '0201', title: '个人信息管理', icon: 'user', router: 'PersonalInfo'}
  ]
}, {
  id: '04',
  title: '项目管理',
  icon: 'folder-open',
  items: [
    {id: '0401', title: '我的项目', icon: 'bars', router: 'MyProject'}
  ]
}, {
  id: '05',
  title: '成果管理',
  icon: 'profile',
  items: [
    {id: '0501', title: '论文信息', icon: 'file-pdf', router: 'ThesisInfo'},
    {id: '0505', title: '论文管理', icon: 'file-pdf', router: 'ThesisInfo'},
    {id: '0502', title: '著作权信息', icon: 'copyright', router: 'CopyrightInfo'},
    {id: '0503', title: '专利信息', icon: 'solution', router: 'PatentInfo'},
    {id: '0504', title: '获奖信息', icon: 'file-text', router: 'WinningInfo'}
  ]
}, {
  id: '06',
  title: '导出管理',
  icon: 'profile',
  items: [
    {id: '0601', title: '信息导出', icon: 'desktop', router: 'OutputInfo'}
  ]
}]

export default MenuList
