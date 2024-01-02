import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return (<Text {...props} style={[props.style, { fontFamily: 'RubikRegular' }]} />);
}
export function RubikLightText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'RubikLight' }]} />;
}
export function RubikMaps(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'RubikMaps' }]} />;
}