import { defineStore } from 'pinia'

export const choseComponent = defineStore('choseComponent',{
    state: () => ({
        selected:'',
    })
});
