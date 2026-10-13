// Builds one combined photo list for the Home strip and the Photo Gallery page:
// gallery photos + every event photo + every conference photo,
// de-duplicated and sorted from the latest to the oldest.
// The built-in (hardcoded) lists are always included, so photos still show
// even if the database returns an empty or partial list.
import { GALLERY_FALLBACK } from '@/data/galleryData';
import { SPECIAL_EVENTS_FALLBACK } from '@/data/specialEventsData';
import { CONFERENCES_FALLBACK } from '@/data/conferencesData';

export function getAllPhotos({ gallery, events, conferences } = {}) {
    const galleryList = [...(gallery || []), ...GALLERY_FALLBACK];
    const eventList = [...(events || []), ...SPECIAL_EVENTS_FALLBACK];
    const confList = [...(conferences || []), ...CONFERENCES_FALLBACK];

    const all = [];
    const push = (id, title, date, category, url, order) => {
        if (url) all.push({ id, title, date: date || '', category, imageUrl: url, order });
    };

    galleryList.forEach((g, i) => push(`g-${g.id || i}`, g.title, g.date, g.category, g.imageUrl, i));
    eventList.forEach((e, ei) => {
        const urls = e.images && e.images.length > 0 ? e.images : [e.imageUrl];
        urls.forEach((u, i) => push(`e-${e.id || ei}-${i}`, e.title, e.date, e.category, u, i));
    });
    confList.forEach((c, ci) => {
        const urls = c.images && c.images.length > 0 ? c.images : [c.imageUrl];
        urls.forEach((u, i) => push(`c-${c.id || ci}-${i}`, c.name || c.shortName, c.date, 'Conference', u, i));
    });

    const seen = new Set();
    return all
        .filter((p) => (seen.has(p.imageUrl) ? false : (seen.add(p.imageUrl), true)))
        .sort((a, b) => {
            const da = a.date ? new Date(a.date).getTime() : 0;
            const db = b.date ? new Date(b.date).getTime() : 0;
            return db - da || a.order - b.order;
        });
}
