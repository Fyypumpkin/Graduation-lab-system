import IndexRouter from './index/index-router'
import TestRouter from './test/test-router'
import PersonalInfoRouter from './pages/personal-info-router.js'
import ResultRouter from './pages/result-mng-router'
import CopyrightRouter from './pages/copyright-info'
import ProjectRouter from './pages/project-info'

export default Object.assign({}
, IndexRouter, TestRouter, PersonalInfoRouter, ResultRouter, CopyrightRouter, ProjectRouter)
