/**
 * @author fyypumpkin on 2018/5/1.
 */

const MenuList = [{
  id: '01',
  title: '信息检索',
  icon: 'desktop',
  items: [
    {id: '0101', title: 'test', icon: 'desktop', router: 'Test'},
    {id: '0102', title: 'test2', icon: 'desktop', router: 'Test2'}
  ]
}, {
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

  ]
}, {
  id: '05',
  title: '成果管理',
  icon: 'profile',
  items: [
    {id: '0501', title: '论文信息', icon: 'file-pdf', router: 'ThesisInfo'},
    {id: '0505', title: '论文管理', icon: 'file-pdf', router: 'ThesisInfo'},
    {id: '0502', title: '著作权信息', icon: 'copyright', router: 'CopyrightInfo'},
    {id: '0503', title: '专利信息', icon: 'solution', router: 'Test'},
    {id: '0504', title: '获奖信息', icon: 'file-text', router: 'Test2'}
  ]
}, {
  id: '06',
  title: '学术活动',
  icon: 'notification',
  items: [
    {id: '0601', title: '活动信息管理', icon: 'setting', router: 'AcademicMng'},
    {id: '0602', title: '学术会议', icon: 'setting', router: 'AcademicConference'},
    {id: '0603', title: '论文交流', icon: 'setting', router: 'ThesisCommunication'}
  ]
}]

export default MenuList
