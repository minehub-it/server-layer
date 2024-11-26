export function versionsToString(versions: string[]) {
  if (versions && versions.length > 0) {
    versions = versions
        .map((v) => v.replace(/\d+/g, (n) => +n + 100000))
        .sort()
        .map((v) => v.replace(/\d+/g, (n) => +n - 100000));
    if (versions.length > 2) {
      return "da " + versions[0] + " a " + versions[versions.length - 1];
    } else {
      return versions.join(", ");
    }
  }
}

export function convertPlatformIdToFullName(platformId: string) {
  switch(platformId) {
    case 'be':
      return 'Bedrock Edition'
    case 'je':
    default:
      return 'Java Edition'
  }
}

export function convertPlatformIdToSlug(platformId: string) {
  switch(platformId) {
    case 'je':
      return 'java-edition'
    case 'be':
      return 'bedrock-edition'
  }
}

export function serverRoute(slug: string) {
  return `/server/${slug}`
}