import { z } from "zod";

export const toJSON = (r: Response) => r.json();

export class SpotifyAPI {
  static URLS = {
    recentlyPlayed: new URL(
      `https://api.spotify.com/v1/me/player/recently-played`,
    ),
  };

  async fetchRecentlyPlayed({
    after,
    before,
  }: {
    after: string | undefined;
    before: string | undefined;
  }) {
    const track = z.object({
      href: z.string().url(),
      id: z.string().min(1),
      name: z.string().min(1),
      uri: z.string().min(1),
      artits: z.array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
        }),
      ),
    });
    const item = z.object({ track });
    const items = z.array(item);
    const toTracks = (data: z.infer<typeof items>) => items.parse(data);

    const url = SpotifyAPI.URLS.recentlyPlayed;
    if (after) url.searchParams.set("after", after);
    if (before) url.searchParams.set("before", before);
    return fetch(url).then(toJSON).then(toTracks);
  }
}
