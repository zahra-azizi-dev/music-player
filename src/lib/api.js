const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getCategories() {
  const res = await fetch(`${STRAPI_URL}/api/categories?populate=*`);
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data;
}

export async function getCategoryBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}&populate[children][populate]=*&populate[songs][populate]=*`,
  );

  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data[0];
}
export async function getSubGenres() {
  const res = await fetch(
    `${STRAPI_URL}/api/categories?filters[parent][id][$notNull]=true&populate[songs][populate]=artist`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data;
}
export async function getLatestSongs() {
  const res = await fetch(
    `${STRAPI_URL}/api/songs?sort=createdAt:desc&pagination[limit]=120&populate=*`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  const seenArtists = new Set();
  const uniqueLatestSongs = result.data.filter((song) => {
    const artistName = song.artist?.name;
    if (seenArtists.has(artistName)) {
      return false;
    }

    seenArtists.add(artistName);
    return true;
  });

  return uniqueLatestSongs;
}
export async function getSingleSongs() {
  const res = await fetch(
    `${STRAPI_URL}/api/songs?filters[categories][slug][$eq]=best-of-the-best&populate=*`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data;
}
export async function searchSongs(query) {
  const res = await fetch(
    `${STRAPI_URL}/api/songs?filters[title][$containsi]=${query}&populate=*`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data;
}
export function getArtistNames(val) {
  const names = val.songs.map((song) => song.artist?.name).filter(Boolean);
  const UnicName = [...new Set(names)];
  return UnicName.slice(0, 3).join(",");
}
export async function getSongBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/songs?filters[slug][$eq]=${slug}&populate=*`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data[0];
}
export async function getArtists() {
  const res = await fetch(`${STRAPI_URL}/api/artists?populate=*`);
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data;
}
export async function getArtistBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/artists?filters[slug][$eq]=${slug}&populate[songs][populate]=artist&populate[albums][populate]=*`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data[0];
}
export async function getAlbumsByArtist(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/albums?filters[artist][slug][$eq]=${slug}&populate=*`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data;
}
export async function getAlbumBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/albums?filters[slug][$eq]=${slug}&populate[songs][populate]=artist&populate[artist][populate]=*`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }
  const result = await res.json();
  return result.data[0];
}
export async function getMainCategories() {
  const res = await fetch(
    `${STRAPI_URL}/api/categories?filters[parent][$null]=true`,
  );
  if (!res.ok) {
    throw new Error("there is error");
  }

  const data = await res.json();
  return data.data;
}
