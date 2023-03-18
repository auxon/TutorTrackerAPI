{ pkgs }: {
	deps = [
		pkgs.dotnetPackages.Nuget
  pkgs.nodejs-16_x
  pkgs.jq.bin
  pkgs.dotnet-sdk
    pkgs.omnisharp-roslyn
	];
}