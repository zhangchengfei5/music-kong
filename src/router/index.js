import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/discover_music",
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/index"),
    children: [
      {
        path: "/discover_music",
        name: "discover_music",
        component: () => import("../views/main_menu/discover_music"),
      },
      {
        path: "/boke",
        name: "boke",
        component: () => import("../views/main_menu/boke"),
      },
      {
        path: "/video",
        name: "video",
        component: () => import("../views/main_menu/video"),
      },
      {
        path: "/video_detail",
        name: "video_detail",
        component: () => import("../views/main_menu/module/video_detail"),
      },
      {
        path: "/hot_comment_detail",
        name: "hot_comment_detail",
        component: () => import("../views/main_menu/module/hot_comment_detail"),
      },
      {
        path: "/friends",
        name: "friends",
        component: () => import("../views/main_menu/friends"),
      },
      {
        path: "/living",
        name: "living",
        component: () => import("../views/main_menu/living"),
      },
      {
        path: "/private_fm",
        name: "private_fm",
        component: () => import("../views/main_menu/private_fm"),
      },
      {
        path: "/local_download",
        name: "local_download",
        component: () => import("../views/main_menu/my_music/local_download"),
      },
      {
        path: "/last_play",
        name: "last_play",
        component: () => import("../views/main_menu/my_music/last_play"),
      },
      {
        path: "/my_music_cloud",
        name: "my_music_cloud",
        component: () => import("../views/main_menu/my_music/my_music_cloud"),
      },
      {
        path: "/my_boke",
        name: "my_boke",
        component: () => import("../views/main_menu/my_music/my_boke"),
      },
      {
        path: "/my_collections",
        name: "my_collections",
        component: () => import("../views/main_menu/my_music/my_collections"),
      },
      {
        path: "/my_favourtie_song",
        name: "my_favourtie_song",
        component: () =>
          import("../views/main_menu/create_song_menu/my_favourtie_song"),
      },
      {
        path: "/album_song",
        name: "album_song",
        component: () =>
          import("../views/main_menu/create_song_menu/album_song"),
      },
      {
        path: "/singer_detail",
        name: "singer_detail",
        component: () =>
          import("../views/main_menu/create_song_menu/singer_detail"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
