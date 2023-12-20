import {useEffect} from "react";

export const useTitle = (title: string, dependency: any[] = []) => {
    useEffect(() => {
        document.title = title
    }, [...dependency])
}