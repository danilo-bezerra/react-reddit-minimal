export interface SubRedditDTO {
  data: {
    id: string;
    title: string;
    url: string;
    banner_img: string;
    icon_img: string;
    primary_color: string;
  };
}

export interface SubRedditsDTO {
  kind: string;
  data: {
    children: SubRedditDTO[];
  };
}
