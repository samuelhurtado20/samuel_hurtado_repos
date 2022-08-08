import Utils from "../utils/utils"

Utils.setMock()
describe('Información de verificación', () => {

    it("checks if API returns expected data", async () => {
        const results = await Utils.GetVerificationType()
        expect(200)
        expect(results.repositories[0].state).toEqual(604)
    });
});