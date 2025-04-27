import { json } from "@sveltejs/kit";
import { WebUntisAnonymousAuth, WebUntisElementType } from 'webuntis';

export async function GET() {
    try {
        const untis = new WebUntisAnonymousAuth('HSA', 'mese.webuntis.com');

        await untis.login();
        const classes = await (untis.getClasses as () => Promise<any[]>)(); // goofy ahh umschreibung, damit typescript sich nicht beschwert 
        const timetable = await untis.getTimetableForToday(classes[0].id, WebUntisElementType.CLASS);

        return json([classes, timetable]);

    } catch (error) {
        console.error(error);
    }
}