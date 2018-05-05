import IndexRouter from './index/index-router'
import TestRouter from './test/test-router'
import PersonalInfoRouter from './pages/personal-info-router.js'
import AcademicRouter from './pages/academic-router'
import ResultRouter from './pages/result-mng-router'

export default Object.assign({}
, IndexRouter, TestRouter, PersonalInfoRouter, AcademicRouter, ResultRouter)
