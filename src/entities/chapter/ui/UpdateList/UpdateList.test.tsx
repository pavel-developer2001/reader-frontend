
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import UpdateList from "./index";
import { configureStore } from "@reduxjs/toolkit";
import { getUpdateChapters } from "../../model/chapter.slice";

describe("UpdateList tests", () => {
  let mockStore = configureStore({ reducer: [] });
  let store, wrapper;

  test("get data", () => {
    let updateList;
    let dispatch = useDispatch();
    dispatch(getUpdateChapters());
    expect(updateList).toBe([
      {
        id: 5,
        numberChapter: "1",
        volumeChapter: "1",
        titleChapter: "test",
        language: "Русский",
        countLikes: 0,
        createdAt: "2022-01-20T09:24:18.810Z",
        updatedAt: "2022-01-20T09:24:18.810Z",
        manga: {
          id: 4,
          title: "Мукхян — Дарк Леди",
          yearOfIssue: "2019",
          englishTitle: "MookHyang — Dark Lady",
          originalTitle: "묵향 다크레이디",
          mangaDescription:
            "Будучи мастером школы темных искусств и непобедимым незыблемым истым демоном, Мукхян, к несчастью, попадает в странный фэнтезийный мир из-за магии своих врагов (школа искусств крови). В новом мире эльфов, колдунов, рыцарей и драконов, разворачивается приключение Мукхяна по поиску пути назад в его старый мир, Мурим.",
          statusManga: "Продолжается",
          typeManga: "Манхва",
          ageRatingManga: "16+",
          mangaCover:
            "http://res.cloudinary.com/dclr9naft/image/upload/v1642670574/vunjgfalhzojhzp5px6x.jpg",
          watchCount: 0,
          createdAt: "2022-01-20T09:23:03.892Z",
          updatedAt: "2022-01-20T09:23:05.673Z",
          user: {
            id: 4,
            name: "dark",
            email: "dark@gmail.com",
            password:
              "$2b$05$6w50.nqrEwWo.F7gWYXUIO5dK4vrr8O0cTo1WmoPsSysHuvs6MWKS",
            avatar: null,
            createdAt: "2022-01-19T04:58:57.770Z",
            updatedAt: "2022-01-19T04:58:57.770Z",
          },
          tags: [
            {
              id: 6,
              name: "Будущее",
              createdAt: "2022-01-20T08:18:33.055Z",
              updatedAt: "2022-01-20T08:18:33.055Z",
            },
            {
              id: 5,
              name: "Шантаж",
              createdAt: "2022-01-19T05:35:39.894Z",
              updatedAt: "2022-01-19T05:35:39.894Z",
            },
            {
              id: 7,
              name: "Эльфы",
              createdAt: "2022-01-20T09:23:03.857Z",
              updatedAt: "2022-01-20T09:23:03.857Z",
            },
            {
              id: 1,
              name: "Веб",
              createdAt: "2022-01-15T09:30:13.699Z",
              updatedAt: "2022-01-15T09:30:13.699Z",
            },
          ],
          genres: [
            {
              id: 16,
              name: "Спорт",
              createdAt: "2022-01-20T08:18:33.069Z",
              updatedAt: "2022-01-20T08:18:33.069Z",
            },
            {
              id: 17,
              name: "Детектив",
              createdAt: "2022-01-20T08:18:33.075Z",
              updatedAt: "2022-01-20T08:18:33.075Z",
            },
            {
              id: 15,
              name: "Романтика",
              createdAt: "2022-01-19T05:35:39.915Z",
              updatedAt: "2022-01-19T05:35:39.915Z",
            },
            {
              id: 10,
              name: "Трагедия",
              createdAt: "2022-01-15T09:24:33.320Z",
              updatedAt: "2022-01-15T09:24:33.320Z",
            },
          ],
        },
        user: {
          id: 4,
          name: "dark",
          email: "dark@gmail.com",
          password:
            "$2b$05$6w50.nqrEwWo.F7gWYXUIO5dK4vrr8O0cTo1WmoPsSysHuvs6MWKS",
          avatar: null,
          createdAt: "2022-01-19T04:58:57.770Z",
          updatedAt: "2022-01-19T04:58:57.770Z",
        },
      },
      {
        id: 4,
        numberChapter: "1",
        volumeChapter: "1",
        titleChapter: "test",
        language: "Русский",
        countLikes: 0,
        createdAt: "2022-01-20T07:17:56.580Z",
        updatedAt: "2022-01-20T07:17:56.580Z",
        manga: {
          id: 1,
          title: "Наномашины",
          yearOfIssue: "2020",
          englishTitle: "Nano Machine",
          originalTitle: "某天成为魔神",
          mangaDescription:
            "Чен Еун — незаконнорожденный принц, появившийся на свет без единой частички Нейгуна. С самого раннего детства он находился под гнетом всеобщего отвращения. Весь забитый, с отсутствием какой-либо мотивации, год за годом Еун влачил свое жалкое существование. Ни на что не рассчитывая... и не претендуя.",
          statusManga: "Продолжается",
          typeManga: "Манхва",
          ageRatingManga: "16+",
          mangaCover:
            "http://res.cloudinary.com/dclr9naft/image/upload/v1642569080/qr3u1nuui3w2uxknjypo.jpg",
          watchCount: 0,
          createdAt: "2022-01-19T05:11:29.275Z",
          updatedAt: "2022-01-19T05:11:30.609Z",
          user: {
            id: 4,
            name: "dark",
            email: "dark@gmail.com",
            password:
              "$2b$05$6w50.nqrEwWo.F7gWYXUIO5dK4vrr8O0cTo1WmoPsSysHuvs6MWKS",
            avatar: null,
            createdAt: "2022-01-19T04:58:57.770Z",
            updatedAt: "2022-01-19T04:58:57.770Z",
          },
          tags: [
            {
              id: 1,
              name: "Веб",
              createdAt: "2022-01-15T09:30:13.699Z",
              updatedAt: "2022-01-15T09:30:13.699Z",
            },
            {
              id: 3,
              name: "В цвете",
              createdAt: "2022-01-19T05:11:29.275Z",
              updatedAt: "2022-01-19T05:11:29.275Z",
            },
            {
              id: 4,
              name: "Умный ГГ",
              createdAt: "2022-01-19T05:11:29.275Z",
              updatedAt: "2022-01-19T05:11:29.275Z",
            },
          ],
          genres: [
            {
              id: 12,
              name: "Сёнен",
              createdAt: "2022-01-19T05:11:29.275Z",
              updatedAt: "2022-01-19T05:11:29.275Z",
            },
            {
              id: 13,
              name: "Боевые искусства",
              createdAt: "2022-01-19T05:11:29.275Z",
              updatedAt: "2022-01-19T05:11:29.275Z",
            },
            {
              id: 11,
              name: "Боевик",
              createdAt: "2022-01-15T09:24:48.622Z",
              updatedAt: "2022-01-15T09:24:48.622Z",
            },
          ],
        },
        user: {
          id: 4,
          name: "dark",
          email: "dark@gmail.com",
          password:
            "$2b$05$6w50.nqrEwWo.F7gWYXUIO5dK4vrr8O0cTo1WmoPsSysHuvs6MWKS",
          avatar: null,
          createdAt: "2022-01-19T04:58:57.770Z",
          updatedAt: "2022-01-19T04:58:57.770Z",
        },
      },
    ]);
  });
  test("Return loading", () => {
    store = mockStore([]);
    render(<UpdateList />);
    const loading = screen.findAllByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
});
