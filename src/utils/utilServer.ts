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

export function getServerFavicon(server: IServer) {
  return server.favicon
}