import {localStorageFn} from "./helpers"

describe('useFilms Hook', () => {
    it('should fetch and return film data', async () => {
        localStorageFn.setItem("key", "aa")

        expect(localStorageFn.getItem("key")).toBe("aa")
     })
})