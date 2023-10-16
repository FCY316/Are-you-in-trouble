import changeLocalStorage from '@/hooks/useChangeLocalStorage';
import './index.scss'
import { useTranslation } from 'react-i18next';
import cnbanner from '@/image/cnbanner.jpg'
import enbanner from '@/image/enbanner.jpg'
// 未连接钱包的展示
const Ununited = (props:{show?:boolean}) => {
    const {show = false} = props
    const { language } = changeLocalStorage.useContainer()
    const { t } = useTranslation()
    return (
        <>
            <div className='banner'>
                <img src={language === 'cn' ? cnbanner : enbanner} alt="" />
            </div>
           {
            show &&  <div className='text' >
             <span>
                 Are you in trouble？
                 <br />
                 {t('home.text')}
             </span>
         </div>
           }
        </>
    )
}
export default Ununited