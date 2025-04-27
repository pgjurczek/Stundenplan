import { json } from "@sveltejs/kit";
import { WebUntisAnonymousAuth, WebUntisElementType } from "webuntis";

export async function GET() {
    const untis = new WebUntisAnonymousAuth('HSA', 'mese.webuntis.com');
    await untis.login();
    const classes = await untis.getClasses(false, 2025);
    const timetable = await untis.getTimetableForToday(classes[0].id, WebUntisElementType.CLASS);
    return json(classes);
}