import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"
type dataType = {
    language: string | null,
}
const initialState: dataType = {
    language: localStorage.getItem('language')
}
const useChangeLocalStorage = (props = initialState) => {
    const [data, setData] = useState<dataType>(props);
    let changeLanguage = (language = 'cn') => changeLanguageF(language);
    // 连接钱包
    const changeLanguageF = (language: string) => {
        localStorage.setItem('language', language)
        setData({ ...data, language })
    }
    // 在页面初始化的时候检测本地是都有缓存，有的话连接，没有的话不管
    useEffect(() => {
        if (!initialState.language) {
            changeLanguage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { ...data, changeLanguage }
}
const changeLocalStorage = createContainer(useChangeLocalStorage)
export default changeLocalStorage
