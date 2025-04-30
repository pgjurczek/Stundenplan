import { json } from "@sveltejs/kit";
import { WebUntisAnonymousAuth, WebUntisElementType } from 'webuntis';
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    try {
        const classIdParam = url.searchParams.get('classId');
        const classId = classIdParam !== null ? parseInt(classIdParam, 10) : NaN;
        console.log("classId", classId);
        console.log("typeOf classid", typeof(classIdParam));

        const untis = new WebUntisAnonymousAuth('HSA', 'mese.webuntis.com');

        await untis.login();
        const classes = await (untis.getClasses as () => Promise<any[]>)(); // goofy ahh umschreibung, damit typescript sich nicht beschwert 
        console.log("classes", classes[0].name);

        const timetable = await untis.getTimetableForToday(classId, WebUntisElementType.CLASS);

        return json([classes, timetable]);

    } catch (error) {
        console.error(error);
        return json({ error: error, msg: "server fehler" },);
    }
}