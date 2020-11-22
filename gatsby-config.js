module.exports = {
  siteMetadata: {
    title: 'Samsungb2bAtHome',
    description: 'Streaming Lanzamiento s20 s20+.',
    author: '@diversivocl',
    menuLinks: [
      {
        name: 'STREAMING',
        link: '/streaming ',
      }
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'diversivo-website',
        short_name: 'starter',
        start_url: '/',
        background_color: '#1c1c1c',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/assets/svg/inline/`, // See below to configure properly
        },
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'nuevapudahuel-escaneaygana',
      },
    },
    {
      resolve: `gatsby-plugin-tawk`,
      options: {
        tawkId: "5f563a7bf0e7167d000e1a94",
        // get this from the tawk script widget
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
