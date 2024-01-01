import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return (<Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />);
}
export function QuickSandText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'QuickSand' }]} />;
}
export function RubikMaps(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'RubikMaps' }]} />;
}