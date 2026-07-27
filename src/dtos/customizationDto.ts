import { IsIn, IsOptional, IsString } from 'class-validator';

const BORDER_STYLES = ['dotted','dashed','solid','double','groove','ridge','inset','outset','none','hidden'];

export class UpdateCustomizationDto {
  @IsOptional() @IsString() input_width?: string;
  @IsOptional() @IsString() input_height?: string;
  @IsOptional() @IsIn(BORDER_STYLES) input_border?: string;
  @IsOptional() @IsString() input_border_radius?: string;
  @IsOptional() @IsString() input_background_color?: string;
  @IsOptional() @IsIn(['plain','primary','secondary','tertiary','monochromePlain']) button_variant?: string;
  @IsOptional() @IsString() border_width?: string;
  @IsOptional() @IsString() border_color?: string;
  @IsOptional() @IsString() button_width?: string;
  @IsOptional() @IsString() button_height?: string;
  @IsOptional() @IsIn(BORDER_STYLES) button_border?: string;
  @IsOptional() @IsString() button_background_color?: string;
  @IsOptional() @IsString() button_text_color?: string;
  @IsOptional() @IsIn(['vertical','horizontal']) direction?: string;
  @IsOptional() @IsString() css?: string;
}