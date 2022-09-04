import CommentBlockList, { CommentsBlock } from ".";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../shared/lib/helpers/renderWithRedux";
import { IComment } from "../../../../shared/api/reader/models";


describe("CommentsBlock", () => {
  let items: IComment[];

  beforeEach(() => {
    items = [
      {
        id: 5,
        commentText: "test1",
        spoiler: true,
        countLikes: 0,
        createdAt: "2022-01-20T09:24:59.361Z",
        updatedAt: "2022-01-20T09:24:59.361Z",
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
              id: 1,
              name: "Веб",
              createdAt: "2022-01-15T09:30:13.699Z",
              updatedAt: "2022-01-15T09:30:13.699Z",
            },
            {
              id: 5,
              name: "Шантаж",
              createdAt: "2022-01-19T05:35:39.894Z",
              updatedAt: "2022-01-19T05:35:39.894Z",
            },
            {
              id: 6,
              name: "Будущее",
              createdAt: "2022-01-20T08:18:33.055Z",
              updatedAt: "2022-01-20T08:18:33.055Z",
            },
            {
              id: 7,
              name: "Эльфы",
              createdAt: "2022-01-20T09:23:03.857Z",
              updatedAt: "2022-01-20T09:23:03.857Z",
            },
          ],
          genres: [
            {
              id: 10,
              name: "Трагедия",
              createdAt: "2022-01-15T09:24:33.320Z",
              updatedAt: "2022-01-15T09:24:33.320Z",
            },
            {
              id: 15,
              name: "Романтика",
              createdAt: "2022-01-19T05:35:39.915Z",
              updatedAt: "2022-01-19T05:35:39.915Z",
            },
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
          ],
        },
      },
      {
        id: 6,
        commentText: "это топ",
        spoiler: false,
        countLikes: 0,
        createdAt: "2022-01-20T09:25:04.228Z",
        updatedAt: "2022-01-20T09:25:04.228Z",
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
              id: 1,
              name: "Веб",
              createdAt: "2022-01-15T09:30:13.699Z",
              updatedAt: "2022-01-15T09:30:13.699Z",
            },
            {
              id: 5,
              name: "Шантаж",
              createdAt: "2022-01-19T05:35:39.894Z",
              updatedAt: "2022-01-19T05:35:39.894Z",
            },
            {
              id: 6,
              name: "Будущее",
              createdAt: "2022-01-20T08:18:33.055Z",
              updatedAt: "2022-01-20T08:18:33.055Z",
            },
            {
              id: 7,
              name: "Эльфы",
              createdAt: "2022-01-20T09:23:03.857Z",
              updatedAt: "2022-01-20T09:23:03.857Z",
            },
          ],
          genres: [
            {
              id: 10,
              name: "Трагедия",
              createdAt: "2022-01-15T09:24:33.320Z",
              updatedAt: "2022-01-15T09:24:33.320Z",
            },
            {
              id: 15,
              name: "Романтика",
              createdAt: "2022-01-19T05:35:39.915Z",
              updatedAt: "2022-01-19T05:35:39.915Z",
            },
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
          ],
        },
      },
      {
        id: 7,
        commentText: "djf",
        spoiler: false,
        countLikes: 0,
        createdAt: "2022-02-16T08:22:53.243Z",
        updatedAt: "2022-02-16T08:22:53.243Z",
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
              id: 1,
              name: "Веб",
              createdAt: "2022-01-15T09:30:13.699Z",
              updatedAt: "2022-01-15T09:30:13.699Z",
            },
            {
              id: 5,
              name: "Шантаж",
              createdAt: "2022-01-19T05:35:39.894Z",
              updatedAt: "2022-01-19T05:35:39.894Z",
            },
            {
              id: 6,
              name: "Будущее",
              createdAt: "2022-01-20T08:18:33.055Z",
              updatedAt: "2022-01-20T08:18:33.055Z",
            },
            {
              id: 7,
              name: "Эльфы",
              createdAt: "2022-01-20T09:23:03.857Z",
              updatedAt: "2022-01-20T09:23:03.857Z",
            },
          ],
          genres: [
            {
              id: 10,
              name: "Трагедия",
              createdAt: "2022-01-15T09:24:33.320Z",
              updatedAt: "2022-01-15T09:24:33.320Z",
            },
            {
              id: 15,
              name: "Романтика",
              createdAt: "2022-01-19T05:35:39.915Z",
              updatedAt: "2022-01-19T05:35:39.915Z",
            },
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
          ],
        },
      },
    ];
  });
  test("should get component", () => {
    items.map((item) =>
      renderWithRedux(
        <CommentsBlock
          token={""}
          userAvatar={item.user.avatar}
          userId={item.user.id}
          userName={item.user.name}
          date={item.createdAt}
          text={item.commentText}
          commentId={item.id}
          commentLikes={item.countLikes}
          commentSpoiler={item.spoiler}
        />
      )
    );
    screen.debug();
    expect(screen.getAllByTestId("comment-item")).toHaveLength(3);
  });
});
