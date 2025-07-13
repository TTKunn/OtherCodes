
export default class CommonConstants {

  public static readonly FULL_LENGTH: string = '100%';

  public static readonly TITLE_WIDTH: string = '80%';

  public static readonly LIST_DEFAULT_WIDTH: string = '93.3%';

  public static readonly OPACITY_DEFAULT: number = 1;

  public static readonly OPACITY_COMPLETED: number = 0.4;

  public static readonly BORDER_RADIUS: number = 24;

  public static readonly FONT_WEIGHT: number = 500;

  public static readonly COLUMN_SPACE: number = 16;

  public static readonly TODO_DATA: Array<Resource> = [
    $r('app.string.todo_list_one'),
    $r('app.string.todo_list_two'),
    $r('app.string.todo_list_three'),
    $r('app.string.todo_list_four'),
    $r('app.string.todo_list_five')
  ];
}

